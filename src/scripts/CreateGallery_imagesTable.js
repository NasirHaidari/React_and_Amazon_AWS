var AWS = require('aws-sdk')

AWS.config.update({
  region: 'eu-north-1',
})

var dynamodb = new AWS.DynamoDB()

var params = {
  TableName: 'GalleryImages',
  KeySchema: [
    // Partition Key
    { AttributeName: 'src', KeyType: 'HASH' },
    // Sort Keys
    { AttributeName: 'className', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'src', AttributeType: 'S' },
    { AttributeName: 'alt', AttributeType: 'S' },
    { AttributeName: 'text', AttributeType: 'S' },
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: 'AlltIndex',
      KeySchema: [
        { AttributeName: 'src', KeyType: 'HASH' },
        { AttributeName: 'alt', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'KEYS_ONLY',
      },
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
}

dynamodb.createTable(params, function (err, data) {
  if (err)
    console.error('Unable to create table: ', JSON.stringify(err, null, 2))
  else
    console.log(
      'Created table with description: ',
      JSON.stringify(data, null, 2)
    )
})
