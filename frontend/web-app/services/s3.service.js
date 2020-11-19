const AWS = require("aws-sdk");

class S3Service {
  constructor() {
    this.bucketName = "flowerpower-user-photos";
    this.region = "us-east-2";
    this.s3Object = new AWS.S3({
      apiVersion: "2006-03-01",
      region: this.region,
      params: { Bucket: this.bucketName },
    });
  }

  async listAndGetObjects(json) {
    if (!json) {
      throw "JSON doesn't exist when fetching objects from S3";
    }
    try {
      let objectsPromise = await this.s3Object
        .listObjectsV2({ Prefix: "testuser453/" })
        .promise();
      let bucketUrl = `https://s3.${this.region}.amazonaws.com/${this.bucketName}/`;
      let photos = objectsPromise.Contents.filter((photo) => photo.Size !== 0);
      if (photos.length !== 0) {
        let photoUrls = photos.map(
          (photo) => bucketUrl + encodeURIComponent(photo.Key)
        );
        json.photoUrls = photoUrls;
        return json;
      }
    } catch (err) {
      throw `Error when listing S3 objects: ${err}`;
    }
  }
}

module.exports = S3Service;
