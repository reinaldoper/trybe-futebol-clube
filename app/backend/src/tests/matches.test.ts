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
import Http = require('chai-http');
chai.use(Http);

const { expect } = chai;
const { app } = new App();
let httpResponse: Response;

describe('Definir o retorno das matches', () => {
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
      expect(body).to.deep.equal(dataFalse);     
    });
    it('Matches inProgress = "true" ', async () => {

      httpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
  
      const { status, body } = httpResponse;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(dataTrue);     
    });
    it('Salvar matches sem o Token', async () => {

      httpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeamId: 16,
        awayTeamId: 3,
      })
      const { status, body } = httpResponse;
      
      expect(status).to.be.equal(401);   
      expect(body.message).to.deep.equal('Token not found');
    });
    it('Passar matches para true iguais com token inválido ', async () => {

      httpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx' })
      .send({
        homeTeamId: 16,
        awayTeamId: 16,
      })
      const { status, body } = httpResponse;    
      expect(status).to.be.equal(401);
      expect(body.message).to.deep.equal('Token must be a valid token');     
    });
    it('Passar matches para true team not exist com token válido ', async () => {
      httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
      const { token } = httpResponse.body;

      httpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: token })
      .send({
        homeTeamId: 40,
        awayTeamId: 16,
      })
      const { status, body } = httpResponse;
  
      expect(status).to.be.equal(404);
      expect(body).to.deep.equal({ message: "There is no team with such id!" });     
    });
    it('Passar matches para true team iquals com  token válido ', async () => {
      httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
      const { token } = httpResponse.body;

      httpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: token })
      .send({
        homeTeamId: 16,
        awayTeamId: 16,
      })
      const { status, body } = httpResponse;
  
      expect(status).to.be.equal(422);
      expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });     
    });
    it('Alterar o status inProgress de uma partida para false no banco de dados sem sucesso', async () => {

      httpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      
      const { status, body } = httpResponse;      
      
      expect(status).to.be.equal(500);
      expect(body).to.deep.equal({ message: 'Not finished' });     
    });

  });
});
