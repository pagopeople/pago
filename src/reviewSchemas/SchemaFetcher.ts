import schema from './schema.json';
import uischema_1 from './uischema_1.json';
import uischema_2 from './uischema_2.json';
import uischema_3 from './uischema_3.json';
import uischema_culture from './uischema_culture.json';


class SchemaFetcher {
    _UI_SCHEMA_MAP: {[key:string]:any} = {
        '1': uischema_1,
        '2': uischema_2,
        '3': uischema_3,
        'culture': uischema_culture,
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
