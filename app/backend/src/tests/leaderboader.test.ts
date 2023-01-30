import * as chai from 'chai';
import { Response } from 'superagent';
import { dataBoard } from './mockes.matches.json/leaderboard.json';
import { dataBoardHome } from './mockes.matches.json/leaderboard.home.test.json';
import { dataBoardAway } from './mockes.matches.json/leaderboard.away.test.json';
// @ts-ignore
/* import Match from '../database/models/matches.model'; */
import { App } from '../app';
import * as sinon from 'sinon';
// @ts-ignore
import Http = require('chai-http');
chai.use(Http);

const { expect } = chai;
const { app } = new App();
let responseHttp: Response;

describe('Retorno das leaderboard', () => {
  describe('Retorna leaderboard final', () => {

    it('Tests leaderboard', async () => {

      responseHttp = await chai
      .request(app)
      .get('/leaderboard')
      .send(dataBoard)
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(dataBoard);   
    });
    it('Retorna leaderboard home" ', async () => {

      responseHttp = await chai
      .request(app)
      .get('/leaderboard/home')
      .send(dataBoardHome)
  
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(dataBoardHome);     
    });
    it('Retorna leaderboard away" ', async () => {

      responseHttp = await chai
      .request(app)
      .get('/leaderboard/away')
      .send(dataBoardAway)
  
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(dataBoardAway);     
    });

  });
});
