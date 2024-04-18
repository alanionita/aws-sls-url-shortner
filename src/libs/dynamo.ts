import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb"

const ddbClient = new DynamoDBClient({});

export const dynamo = {
    write: async (data: Record<string, any>, tableName: string) => {
        
        const putParams: PutCommandInput = {
            TableName: tableName,
            Item: data
        };
        
        const command = new PutCommand(putParams);

        await ddbClient.send(command);

        return data;
    }
}