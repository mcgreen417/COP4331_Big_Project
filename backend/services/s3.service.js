const AWS = require("aws-sdk");
const fs = require("fs");

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
        return photos.map((photo) => {
          return bucketUrl + encodeURIComponent(photo.Key);
        });
      } else {
        return [];
      }
    } catch (err) {
      throw `Error when listing S3 objects: ${err}`;
    }
  }

  async uploadPhotoForUser(subId, plantId, fileName) {
    if (!subId) {
      throw "No sub ID defined for fetching photo URLs";
    }

    try {
      // Filename is probably a buffer...
      const fileContent = await fs.readFile(fileName);
      const params = {
        Key: `${subId}/${plantId}`,
        Body: fileContent,
      };
      let uploadObject = await this.s3Object.upload(params).promise();
    } catch (err) {
      throw `Error while uploading S3 object: ${err}`;
    }
  }

  convertPlantIdToUrl(subId, plantId) {
    if (!subId || !plantId) {
      throw "No sub ID or PlantId defined for fetching photo URLs";
    }

    let bucketUrl = `https://s3.${this.region}.amazonaws.com/${this.bucketName}/`;
    let plantKey = `${subId}/${plantId}`;
    return bucketUrl + encodeURIComponent(plantKey);
  }
}

module.exports = S3Service;
