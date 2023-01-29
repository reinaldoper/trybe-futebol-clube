import * as chai from 'chai';
import { Response } from 'superagent';
import { data } from './mockes.matches.json/matches.json';
/* import { dataFalse } from './mockes.matches.json/matches.false.json'; */
import { dataTrue } from './mockes.matches.json/matches.true.json';
/* import { post } from './mockes.matches.json/matches.post.test.json';
import { postCreate } from './mockes.matches.json/matches.postCreate.json';
import { matchesIguais } from './mockes.matches.json/matchesCreateIguais.json';
import { matchesNot } from './mockes.matches.json/matchesNotExiste.json'; */
// @ts-ignore
import Match from '../database/models/matches.model';
import { App } from '../app';
import * as sinon from 'sinon';
// @ts-ignore
import Http = require('chai-http');
chai.use(Http);

const { expect } = chai;
const { app } = new App();
let httpResponse: Response;

describe('Definir o retorno das matches', () => {
  let chaiHttpResponse: Response;
  describe('Retorna matches', () => {

    it('Matches', async () => {

      httpResponse = await chai
      .request(app)
      .get('/matches')
  
      const { status, body } = httpResponse;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(data);   
    });
    it('Matches inProgress = "false" ', async () => {

      httpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
  
      const { status, body } = httpResponse;
  
      expect(status).to.be.equal(200);
      /* expect(body).to.deep.equal(dataFalse); */     
    });
    it('Matches inProgress = "true" ', async () => {

      httpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
  
      const { status, body } = httpResponse;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(dataTrue);     
    });
    /* it('Salvar matches', async () => {

      httpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeamId: 16,
        awayTeamId: 3,
      })
      const { status, body } = httpResponse;
  
      expect(status).to.be.equal(201);   
    });
    it('Passar matches para true iguais ', async () => {

      httpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeamId: 16,
        awayTeamId: 16,
      })
      const { status, body } = httpResponse;
  
      expect(status).to.be.equal(422);
      expect(body).to.deep.equal({ message: "It is not possible to create a match with two equal teams" });     
    });
    it('Passar matches para true team not exist ', async () => {

      httpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeamId: 40,
        awayTeamId: 16,
      })
      const { status, body } = httpResponse;
  
      expect(status).to.be.equal(404);
      expect(body).to.deep.equal({ message: "There is no team with such id!" });     
    }); */

  });
});
