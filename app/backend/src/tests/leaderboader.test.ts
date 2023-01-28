import * as chai from 'chai';
import { Response } from 'superagent';
import leaderboard from './mockes.matches.json/leaderboard.json';
import leaderboardhome from './mockes.matches.json/leaderboard.home.test.json';
import leaderboardaway from './mockes.matches.json/leaderboard.away.test.json';
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

describe('Retorno das leaderboard', () => {
  let chaiHttpResponse: Response;
  describe('Retorna leaderboard final', () => {

    it('Matches', async () => {
      sinon.stub(Match, 'findAll').resolves(leaderboard as unknown as Match[]);

      responseHttp = await chai
      .request(app)
      .get('/leaderboard')
  
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(leaderboard);   
    });
    it('Retorna leaderboard home" ', async () => {
      sinon.stub(Match, 'findAll').resolves(leaderboardhome as unknown as Match[]);

      responseHttp = await chai
      .request(app)
      .get('/leaderboard/home')
  
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(leaderboardhome);     
    });
    it('Retorna leaderboard away" ', async () => {
      sinon.stub(Match, 'findAll').resolves(leaderboardaway as unknown as Match[]);

      responseHttp = await chai
      .request(app)
      .get('/leaderboard/away')
  
      const { status, body } = responseHttp;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(leaderboardaway);     
    });

  });
});
