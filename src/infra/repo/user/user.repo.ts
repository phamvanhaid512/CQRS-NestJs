import { Client } from 'cassandra-driver';
import * as cassanknex from 'cassanknex';
import { User } from 'src/core/domains/user/user';
import { KEY_SPACE } from './constants';
import { USER_REPO, UserRepo } from 'src/core/repo/user.repo';
import { UserDaoMapper } from './user.mapper';
export class UserDao implements UserRepo {
  private isConnect = false;
  private client: Client;
  private knex: cassanknex.CassanKnex;
  private mapper = new UserDaoMapper();
  private readonly TABLE = 'user';

  constructor() {
    this.client = new Client({
      contactPoints: [process.env.CONTACTPOINTS || 'localhost'],
      keyspace: KEY_SPACE || 'baitap',
      localDataCenter: 'datacenter1',
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
            console.log(err);
            return reject(err);
          } else {
            console.log('Cassandra Connected');
            return resolve('Cassandra Connected');
          }
        });
      });

      this.isConnect = true;
    }
  }

  async create(user: User): Promise<any> {
    console.log('run in file create');
    user.createAt = Date.now();
    user.updateAt = Date.now();
    user.version = 1;
    try {
      await this.knex(KEY_SPACE)
        .insert(this.mapper.fromDomain(user))
        .into(this.TABLE);
      return true;
    } catch (err) {
      throw err;
    }
    // return new Promise((resolve, reject) => {
    //   this.knex(KEY_SPACE)
    //     .insert(this.mapper.fromDomain(user))
    //     .into(this.TABLE)
    //     .exec((err) => {
    //       if (err) {
    //         console.log('bug');
    //         return reject(err);
    //       }
    //       return resolve(true);
    //     });
    // });
  }

  async findByUserName(username: string): Promise<User> {
    console.log('run findUserNamđàe');
    return new Promise((resolve, reject) => {
      this.knex(KEY_SPACE)
        .select()
        .from(this.TABLE)
        .where('username', '=', username)
        .exec((err, res) => {
          if (err) {
            return reject(err);
          }
          if (!res.first()) {
            return resolve(undefined);
          }
          return resolve(this.mapper.toDomain(res[0] as any)); // Sử dụng res[0] để truy cập kết quả đầu tiên.
        });
    });
  }

  async get(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.knex(KEY_SPACE)
        .select()
        .from(this.TABLE)
        .where('id', '=', id)
        .exec((err, res) => {
          if (err) return reject(err);

          return resolve(this.mapper.toDomain(res.first() as any));
        });
    });
  }

  async getAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.knex(KEY_SPACE)
        .select()
        .from(this.TABLE)
        .exec((err, res) => {
          if (err) return reject(err);

          resolve(res.rows?.map((row) => this.mapper.toDomain(row as any)));
        });
    });
  }

  async update(user: User, options: { includePassword: '' }): Promise<Boolean> {
    if (options.includePassword)
      return new Promise((resolve, reject) => {
        this.knex(KEY_SPACE)
          .update(this.TABLE)
          .set('password', user.password)
          .where('id', '=', user.id)
          .exec((err, res) => {
            if (err) {
              return reject(err);
            }
            return resolve(true);
          });
      });

    return new Promise((resolve, reject) => {
      this.knex(KEY_SPACE)
        .update(this.TABLE)
        .set('name', user.name)
        .set('gender', user.gender)
        .set('update_at', Date.now())
        .set('password', user.password)
        .where('id', '=', user.id)
        .exec((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
    });
  }

  async remove(userId: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.knex(KEY_SPACE)
        .delete()
        .from(this.TABLE)
        .where('id', '=', userId)
        .exec((err, res) => {
          if (err) return reject(false);
          return resolve(res.wasApplied());
        });
    });
  }
}

export const userRepoProvider = {
  provide: USER_REPO,
  useFactory: async () => {
    const instance = new UserDao();

    await instance.connect();

    return instance;
  },
};
