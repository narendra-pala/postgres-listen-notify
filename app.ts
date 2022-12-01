import * as express from 'express';
import * as bodyParser from "body-parser";
import { Routes } from './routes';
import { pool }  from './db';

class App {
    public app: express.Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.connectDB();
        this.route.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private connectDB(): void {
        pool.connect( (err,client,done) => {
            if (err) throw new Error(err);
                console.log('Connected');

               const query = client.query('Listen new_trade_event');
               client.on('notification', async (data) => {
                    console.log(`data : ${JSON.stringify(data)}`)
               } )
        } )
        
    }
}

export default new App().app;

/*
create table test_table(
    project_contract_address varchar,
    "name" varchar
);

NOTIFY new_trade_event, 'This is the payload';

create or replace function fn_test_table_modified() returns trigger as $psql$
begin
  perform pg_notify(
    'new_trade_event',
    concat(new.project_contract_address,'|',new.name)
  );return new;
end;$psql$ language plpgsql;

create trigger after_test_table_insert_trigger after
insert
  on test_table for each row execute procedure fn_test_table_modified();

insert into test_table (project_contract_address,"name") values ('testadd2', 'testname') ;

*/