import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  GetCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { User } from "./User";

const s3Client = new S3Client({});
const dynamoDbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoDbClient);

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const TABLE_NAME = process.env.TABLE_NAME!;

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
