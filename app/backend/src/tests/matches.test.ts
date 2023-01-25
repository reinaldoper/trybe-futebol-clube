import * as chai from 'chai';
import { Response } from 'superagent';
import { data } from './mockes.matches.json/matches.json';
import { dataFalse } from './mockes.matches.json/matches.false.json';
import { dataTrue } from './mockes.matches.json/matches.true.json';
// @ts-ignore
import Match from '../database/models/matches.model';
import { App } from '../app';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const { app } = new App();
let responseHttp: Response;

describe('Definir o retorno das matches', () => {
  let chaiHttpResponse: Response;
  describe('Retorna matches', () => {

    it('Matches', async () => {
      sinon.stub(Match, 'findAll').resolves(data as unknown as Match[]);

      responseHttp = await chai
      .request(app)
      .get('/matches')
  
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(data);   
    });
    it('Matches inProgress = "false" ', async () => {
      sinon.stub(Match, 'findAll').resolves(data as unknown as Match[]);

      responseHttp = await chai
      .request(app)
      .get('/matches?inProgress=false')
  
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(dataFalse);     
    });
    it('Matches inProgress = "true" ', async () => {
      sinon.stub(Match, 'findAll').resolves(data as unknown as Match[]);

      responseHttp = await chai
      .request(app)
      .get('/matches?inProgress=true')
  
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(dataTrue);     
    });

  });
});
