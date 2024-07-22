import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  GetCommand,
  DynamoDBDocumentClient,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { User } from "./User";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const TABLE_NAME = process.env.TABLE_NAME!;
const REGION = process.env.REGION!;

const s3Client = new S3Client({});
const dynamoDbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(dynamoDbClient);

const uploadFileToS3 = async (
  file: File,
  userId: string,
  fileType: "image" | "cv"
) => {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const fileExtension = file.type.split("/")[1];
  const key = `users/${userId}/${fileType}.${fileExtension}`;
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: uint8Array,
    ContentType: file.type,
  });
  await s3Client.send(command);
  return `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
};

const createUserItem = (
  user: User,
  imageUrl: string | null | undefined,
  cvUrl: string | null | undefined
) => ({
  name: user.name || null,
  email: user.email || null,
  password: user.password || null,
  address: user.address || null,
  role: user.role || null,
  image: imageUrl,
  CV: cvUrl,
  internshipStartDate: user.internshipStartDate?.toISOString() || null,
  internshipDuration: user.internshipDuration || null,
  internshipType: user.internshipType || null,
  supervisor: null,
});

export const addUserWithImageFile = async (
  user: User,
  imageFile: File,
  cvFile: File
) => {
  let imageUrl: string | null = null;
  let cvUrl: string | null = null;
  try {
    if (imageFile) {
      imageUrl = await uploadFileToS3(imageFile, user.email!, "image");
    }
    if (cvFile) {
      cvUrl = await uploadFileToS3(cvFile, user.email!, "cv");
    }
    const userItem = createUserItem(user, imageUrl, cvUrl);
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: userItem,
    });
    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addUserWithoutImageFile = async (user: User) => {
  try {
    const userItem = createUserItem(user, user.image, user.CV);
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: userItem,
    });
    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { email },
    });
    const response = await docClient.send(command);
    if (!response.Item) {
      return undefined;
    }
    return response.Item as User;
  } catch (error) {
    throw error;
  }
};

const deleteFileFromS3 = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });
  await s3Client.send(command);
};

export const updateUser = async (
  email: string,
  updates: Partial<User>,
  newImageFile?: File,
  newCvFile?: File
) => {
  let imageUrl: string | null = null;
  let cvUrl: string | null = null;

  try {
    const currentUser = await getUserByEmail(email);
    if (!currentUser) {
      throw new Error("User not found");
    }

    if (newImageFile && newImageFile.size > 0 && currentUser.image) {
      const oldImageKey = currentUser.image.split("/").slice(-2).join("/");
      await deleteFileFromS3(oldImageKey);
    }

    if (newCvFile && newCvFile.size > 0 && currentUser.CV) {
      const oldCvKey = currentUser.CV.split("/").slice(-2).join("/");
      await deleteFileFromS3(oldCvKey);
    }

    if (newImageFile && newImageFile.size > 0) {
      imageUrl = await uploadFileToS3(newImageFile, email, "image");
    } else {
      imageUrl = currentUser.image as string;
    }

    if (newCvFile && newCvFile.size > 0) {
      cvUrl = await uploadFileToS3(newCvFile, email, "cv");
    } else {
      cvUrl = currentUser.CV;
    }

    const updateExpressionParts = [];
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: any } = {};

    if (updates.name) {
      updateExpressionParts.push("#name = :name");
      expressionAttributeNames["#name"] = "name";
      expressionAttributeValues[":name"] = updates.name;
    }
    if (updates.address) {
      updateExpressionParts.push("address = :address");
      expressionAttributeValues[":address"] = updates.address;
    }
    if (updates.internshipStartDate) {
      updateExpressionParts.push("internshipStartDate = :internshipStartDate");
      expressionAttributeValues[":internshipStartDate"] =
        updates.internshipStartDate.toISOString();
    }
    if (updates.internshipDuration) {
      updateExpressionParts.push("internshipDuration = :internshipDuration");
      expressionAttributeValues[":internshipDuration"] =
        updates.internshipDuration;
    }
    if (updates.internshipType) {
      updateExpressionParts.push("internshipType = :internshipType");
      expressionAttributeValues[":internshipType"] = updates.internshipType;
    }
    if (imageUrl) {
      updateExpressionParts.push("image = :image");
      expressionAttributeValues[":image"] = imageUrl;
    }
    if (cvUrl) {
      updateExpressionParts.push("CV = :CV");
      expressionAttributeValues[":CV"] = cvUrl;
    }

    if (updates.password) {
      updateExpressionParts.push("password = :password");
      expressionAttributeValues[":password"] = updates.password;
    }

    if (updateExpressionParts.length === 0) {
      throw new Error("No valid fields to update");
    }

    const updateExpression = "set " + updateExpressionParts.join(", ");

    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { email },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "UPDATED_NEW",
    });

    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};
