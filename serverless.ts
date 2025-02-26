import type { AWS } from '@serverless/typescript';

import functions from './serverless/functions';
import dynamoResources from './serverless/dynamo';

const serverlessConfiguration: AWS = {
  service: 'url-shortner',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    profile: 'sls',
    region: 'eu-west-2',
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: 'dynamodb:*',
      Resource: 'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.urlsTable}'
    }],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      URL_TABLE: '${self:custom.urlsTable}',
      BASE_URL: {
        'Fn::Join': [
          '',
          ['https://', { Ref: 'HttpApi' }, '.execute-api.${self:provider.region}.amazonaws.com']
        ]
      }
    },
  },
  // import the function via paths
  functions: functions,
  resources: {
    Resources: {
      ...dynamoResources
    },
    Outputs: {}
  },
  package: { individually: true },
  custom: {
    urlsTable: '${sls:stage}-urls',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
