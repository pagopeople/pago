import schema from './schema.json';
import uischema_1 from './uischema_1.json';
import uischema_2 from './uischema_2.json';


class SchemaFetcher {
    _UI_SCHEMA_MAP: {[key:string]:any} = {
        '1': uischema_1,
        '2': uischema_2,
    };

    getJsonSchema() {
        return schema;
    }

    getUiSchemaWithId(id: string): any {
        if (Object.keys(this._UI_SCHEMA_MAP).includes(id)) {
            return this._UI_SCHEMA_MAP[id];
        }
        throw Error(`No schema with id: ${id}`);
    }
}

export default new SchemaFetcher();
