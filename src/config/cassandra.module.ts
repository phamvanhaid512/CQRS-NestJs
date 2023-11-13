import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
const cassandra = require('cassandra-driver');

@Injectable()
export class DatabaseService {
  private readonly client = new cassandra.Client({
    contactPoints: ['localhost'],
    keyspace: 'table_user',
    localDataCenter: 'datacenter1',
  });
  async execute(query: string, params: any[]): Promise<any> {
    try {
      const result = await this.client.execute(query, params);
      return result.rows;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  }
  async select(query: string, params: any[]): Promise<any[]> {
    try {
      const result = await this.client.execute(query, params);
      return result.rows;
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  }
}
// // cassandra.module.ts

// import { Module } from '@nestjs/common';
// import { CassandraService } from './casandra.service';

// @Module({
//   providers: [CassandraService],
//   exports: [CassandraService],
// })
// export class CassandraModule {}
