import * as chai from 'chai';
import { Response } from 'superagent';
import { data } from './mockes.matches.json/teams.json';
/* import Team from '../database/models/team.model'; */
import { App } from '../app';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const { app } = new App();
let response: Response;

describe('Definir o retorno das teams', () => {

    it('Teams', async () => {

      response = await chai
      .request(app)
      .get('/teams')
  
      const { status, body } = response;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(data);
    });
    it('Teams ID = "1"', async () => {

      response = await chai
      .request(app)
      .get('/teams/1')
  
      const { status, body } = response;
  
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(data[0]);   
    });

  });

