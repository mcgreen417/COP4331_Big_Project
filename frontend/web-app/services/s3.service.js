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

  async getPhotoUrlsForSubId(subId) {
    if (!subId) {
      throw "No sub ID defined for fetching photo URLs";
    }
    try {
      let objectsPromise = await this.s3Object
        .listObjectsV2({ Prefix: `${subId}/` })
        .promise();
      let bucketUrl = `https://s3.${this.region}.amazonaws.com/${this.bucketName}/`;
      let photos = objectsPromise.Contents.filter((photo) => photo.Size !== 0);
      if (photos.length !== 0) {
        return photos.map((photo) => bucketUrl + encodeURIComponent(photo.Key));
      } else {
        return [];
      }
    } catch (err) {
      throw `Error when listing S3 objects: ${err}`;
    }
  }
}

module.exports = S3Service;
