import * as chai from 'chai';
import { Response } from 'superagent';
import { data } from './mockes.json/matches.json';
import { dataFalse } from './mockes.json/matches.false.json';
import { dataTrue } from './mockes.json/matches.true.json';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const app = require('../app');

describe('Definir o retorno das matches', () => {
  let chaiHttpResponse: Response;
  describe('Retorna matches', () => {

    it('Matches', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .send(data);

      const date = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(date.data[0]).to.be.equal(data[0]);    
    });
    it('Matches inProgress = "false" ', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
      .send(dataFalse);

      const date = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(date.dataFalse).to.be.equal(dataFalse);    
    });
    it('Matches inProgress = "true" ', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
      .send(dataTrue);

      const date = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(date.dataTrue).to.be.equal(dataTrue);    
    });

  });
});
