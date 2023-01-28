import * as chai from 'chai';
import { Response } from 'superagent';
import { data } from './mockes.matches.json/matches.json';
import { dataFalse } from './mockes.matches.json/matches.false.json';
import { dataTrue } from './mockes.matches.json/matches.true.json';
import matchespost from './mockes.matches.json/matches.post.test.json';
import matchesCreate from './mockes.matches.json/matches.postCreate.json';
import matechesIguais from './mockes.matches.json/matchesCreateIguais.json';
import matchesNot from './mockes.matches.json/matchesNotExiste.json';
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
    it('Salvar matches', async () => {
      sinon.stub(Match, 'create').resolves(matchesCreate as unknown as Match);

      responseHttp = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeamId: 16,
        awayTeamId: 3,
        homeTeamGoals: 3,
        awayTeamGoals: 2,
      })
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(matchespost);     
    });
    it('Passar matches para true iguais ', async () => {
      let loginToken: string; 
      sinon.stub(Match, 'create').resolves(matechesIguais as unknown as Match);

      responseHttp = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeamId: 16,
        awayTeamId: 16,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      })
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(422);
      expect(body).to.deep.equal({ message: "It is not possible to create a match with two equal teams" });     
    });
    it('Passar matches para true team not exist ', async () => {
      let loginToken: string; 
      sinon.stub(Match, 'create').resolves(matchesNot as unknown as Match);

      responseHttp = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeamId: 40,
        awayTeamId: 16,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      })
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(404);
      expect(body).to.deep.equal({ message: "There is no team with such id!" });     
    });

  });
});
