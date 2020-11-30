const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const port = "http://localhost:5000";

chai.should();
chai.use(chaiHttp);

// TODO: Add remaining API unit tests, reference newEntry/search api testing to set up

describe("New Entry API Testing", () => {
  // Test 1: Create Newton's Nemesis
  describe("POST /protected/newEntry", () => {
    it("Create and verify new plant entry 'Newton's Nemesis'", (done) => {
      const endpoint = {
        userid: "10",
        nickname: "Newton's Nemesis",
        species: "Apple Tree",
        sunlight: 3,
        water: 3,
        notes:
          "Claims to have been a major contributor to Newton's work on gravity",
        date: "2020-11-13",
        classification: ["Flower", "Fruit", "Tree"],
        reminders: { Watered: 2, Pruned: 60 },
      };
      chai
        .request(port)
        .post("/protected/newEntry")
        .send(endpoint)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("UserID").eq("10");
          response.body.should.have.property("Nickname").eq("newton's nemesis");
          response.body.should.have.property("Species").eq("Apple Tree");
          response.body.should.have.property("Sunlight").eq(3);
          response.body.should.have.property("Water").eq(3);
          response.body.should.have
            .property("Notes")
            .eq(
              "Claims to have been a major contributor to Newton's work on gravity"
            );
          response.body.should.have.property("DateAcquired").eq("2020-11-13");
          done();
        });
    });
  });
});

describe("Update Entry API Testing", () => {
  // Test 1: update mandy, fields: nickname, sunlight, notes, date, reminders, species
  describe("POST /protected/editEntry", () => {
    it("Edit and verify planty entry 'mandy'", (done) => {
      const endpoint = {
        userid: "1",
        plantid: "1",
        nickname: "mandy!",
        species: "Mandagora",
        sunlight: 3,
        water: 2,
        notes: "Fatal to those who hear its cries, be sure to wear earmuffs!",
        date: "2020-11-22",
        classification: ["Other"],
        reminders: { Watered: 3, Pruned: 30 },
      };
      chai
        .request(port)
        .post("/protected/editEntry")
        .send(endpoint)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("UserID").eq("1");
          response.body.should.have.property("PlantID").eq("1");
          response.body.should.have.property("Nickname").eq("mandy!");
          response.body.should.have.property("Species").eq("Mandagora");
          response.body.should.have.property("Sunlight").eq(3);
          response.body.should.have.property("Water").eq(2);
          response.body.should.have
            .property("Notes")
            .eq("Fatal to those who hear its cries, be sure to wear earmuffs!");
          response.body.should.have.property("DateAcquired").eq("2020-11-22");
          done();
        });
    });
  });
  //Test 2: update mandy!, fields: classification, nickname
  describe("POST /protected/editEntry", () => {
    it("Edit and verify planty entry 'mandy!'", (done) => {
      const endpoint = {
        userid: "1",
        plantid: "1",
        nickname: "mandy",
        species: "Mandagora",
        sunlight: 3,
        water: 2,
        notes: "Fatal to those who hear its cries, be sure to wear earmuffs!",
        date: "2020-11-22",
        classification: ["Flower"],
        reminders: { Watered: 3, Pruned: 30 },
      };
      chai
        .request(port)
        .post("/protected/editEntry")
        .send(endpoint)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("UserID").eq("1");
          response.body.should.have.property("PlantID").eq("1");
          response.body.should.have.property("Nickname").eq("mandy");
          response.body.should.have.property("Species").eq("Mandagora");
          response.body.should.have.property("Sunlight").eq(3);
          response.body.should.have.property("Water").eq(2);
          response.body.should.have
            .property("Notes")
            .eq("Fatal to those who hear its cries, be sure to wear earmuffs!");
          response.body.should.have.property("DateAcquired").eq("2020-11-22");
          done();
        });
    });
  });
});

describe("Delete Entry API Testing", () => {
  // Test 1: delete mandy
  describe("POST /protected/deleteEntry", () => {
    it("delete and verify planty entry 'mandy'", (done) => {
      const endpoint = {
        userid: "1",
        plantid: "1",
      };
      chai
        .request(port)
        .post("/protected/deleteEntry")
        .send(endpoint)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("UserID").eq("1");
          response.body.should.have.property("PlantID").eq("1");
          done();
        });
    });
  });
});

describe("Search Entry API Testing", () => {
  // Test 1: Find Cactus Jack
  describe("POST /protected/searchEntry", () => {
    it("Search and find existing plant 'Cactus Jack'", (done) => {
      const endpoint = {
        userid: "12918723",
        search: "Cactus Jack",
      };
      chai
        .request(port)
        .post("/protected/searchEntry")
        .send(endpoint)
        .end((err, response) => {
          response.should.have.status(200);
          response.body[0].should.have.property("PlantID").eq("56123317");
          response.body[0].should.have.property("UserID").eq("12918723");
          response.body[0].should.have.property("Nickname").eq("cactus jack");
          response.body[0].should.have.property("Species").eq("Cactus");
          response.body[0].should.have.property("Sunlight").eq(3);
          response.body[0].should.have.property("Water").eq(1);
          done();
        });
    });
  });
  // Test 2: Find Enchanted Beauty
  describe("POST /protected/searchEntry", () => {
    it("Search and find existing plant 'Enchanted Beauty'", (done) => {
      const endpoint = {
        userid: "11",
        search: "Enchanted Beauty",
      };
      chai
        .request(port)
        .post("/protected/searchEntry")
        .send(endpoint)
        .end((err, response) => {
          response.should.have.status(200);
          response.body[0].should.have.property("PlantID").eq("123123");
          response.body[0].should.have.property("UserID").eq("11");
          response.body[0].should.have
            .property("Nickname")
            .eq("enchanted beauty");
          response.body[0].should.have.property("Species").eq("Rose");
          response.body[0].should.have.property("Sunlight").eq(1);
          response.body[0].should.have.property("Water").eq(1);
          done();
        });
    });
  });
  // Test 3: Find Chompy Boi Test1
  describe("POST /protected/searchEntry", () => {
    it("Search and find existing plant 'Chompy Boi Test1'", (done) => {
      const endpoint = {
        userid: "27",
        search: "Chompy Boi Test1",
      };
      chai
        .request(port)
        .post("/protected/searchEntry")
        .send(endpoint)
        .end((err, response) => {
          response.should.have.status(200);
          response.body[0].should.have
            .property("PlantID")
            .eq("2ec8f4c4-2a5d-4c4a-80cc-a0e550be2467");
          response.body[0].should.have.property("UserID").eq("27");
          response.body[0].should.have
            .property("Nickname")
            .eq("chompy boi test1");
          response.body[0].should.have.property("Species").eq("Venus Fly Trap");
          response.body[0].should.have.property("Sunlight").eq(1);
          response.body[0].should.have.property("Water").eq(3);
          done();
        });
    });
  });
});
