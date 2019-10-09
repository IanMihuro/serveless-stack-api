import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, faliure } from "./libs/responses-lib";

export async function main(event, context) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: "notes",
        Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: uuid.v1(),
        content: data.content,
        attachment: data.attachment,
        createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    }
    catch (e) {
        return faliure({ status: false});
    }
};