// cassandra.service.ts

import { Injectable } from '@nestjs/common';
import * as cassanknex from 'cassanknex';
// import * as Knex from 'knex';
import { Client } from 'cassandra-driver';
@Injectable()
export class CassandraService {
  private readonly client: Client;
  private isConnect = false;
  private knex: cassanknex.CassanKnex;
  private readonly TABLE = 'users';
  constructor() {
    this.client = new Client({
      contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || 'localhost'],
      keyspace: process.env.CASSANDRA_KEYSPACE || 'bai_tap',
      localDataCenter: process.env.CASSANDRA_LOCAL_DATA_CENTER || 'datacenter1',
    });
  }
  public async connect(): Promise<void> {
    if (!this.isConnect) {
      await this.client.connect();

      this.knex = cassanknex({
        connection: this.client,
        debug: false,
      });

      // cconvert event to promise
      new Promise((resolve, reject) => {
        this.knex.on('ready', (err) => {
          if (err) {
            return reject(err);
          } else {
            console.log('sdff');

            return resolve('Cassandra Connected');
          }
        });
      });

      this.isConnect = true;
    }
  }
  getClient() {
    return this.client;
  }
}
