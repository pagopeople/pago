import schema from './schema.json';
import uischema_midproj from './uischema_midproj.json';
import uischema_endproj from './uischema_endproj.json';
import uischema_manager from './uischema_manager.json';
import uischema_culture from './uischema_culture.json';


class SchemaFetcher {
    _UI_SCHEMA_MAP: {[key:string]:any} = {
        'midproj': uischema_midproj,
        '1': uischema_midproj,
        'endproj': uischema_endproj,
        '2': uischema_endproj,
        'manager': uischema_manager,
        '3': uischema_manager,
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
