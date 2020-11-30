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

  async uploadPhotoForUser(subId, plantId, file) {
    if (!subId) {
      throw "No sub ID defined for fetching photo URLs";
    }

    try {
      let self = this;
      return await new Promise(function (resolve, reject) {
        fs.readFile(file.path, (err, data) => {
          if (err) {
            reject(err);
          } else {
            const params = {
              Key: `${subId}/${plantId}.jpg`,
              Body: data,
            };
            self.s3Object.upload(params, function (err, data) {
              fs.unlink(file.path, function (err) {
                if (err) {
                  reject(err);
                }
                console.log("Temp File Delete");
              });

              console.log("PRINT FILE:", file);
              if (err) {
                console.log("ERROR MSG: ", err);
                reject(err);
              } else {
                console.log("Successfully uploaded data");
                resolve(self.convertPlantIdToUrl(subId, plantId));
              }
            });
          }
        });
      });
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
    return bucketUrl + encodeURIComponent(plantKey) + ".jpg";
  }
}

module.exports = S3Service;
