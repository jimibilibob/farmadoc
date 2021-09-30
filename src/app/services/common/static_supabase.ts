/* eslint-disable no-underscore-dangle */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';

export class StaticSupabase {

  private static _instance: StaticSupabase;
  private static _supabaseClient: SupabaseClient = createClient(environment.supabaseUrl, environment.supbaseKey);

  _constructor() {}

  static get instance(): StaticSupabase {
      return this._instance || (this._instance = new this());
  }

  static get supabaseClient() {
    return this._supabaseClient;
  }
}
