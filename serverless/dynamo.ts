import type { AWS } from '@serverless/typescript';

const dynamoResources: AWS['resources']['Resources'] = {
    UrlsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:custom.urlsTable}',
            AttributeDefinitions: [{
                AttributeName: 'id',
                AttributeType: 'S'
            }],
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                }
            ],
            BillingMode: 'PAY_PER_REQUEST',
            Tags: [{ Key: 'For', Value: 'sam-course' }, { Key: 'Date', Value: '2024-04-15' }, { Key: 'CanIDelete', Value: 'Yes' }, { Key: 'Author', Value: 'Alan' }]
        }
    },
}

export default dynamoResources;