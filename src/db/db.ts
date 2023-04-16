import { DATABASE_USERNAME, DATABASE_PASSWORD } from '$env/static/private';
import { connect } from '@planetscale/database';

const config = {
	host: 'aws.connect.psdb.cloud',
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD
};
export const conn = await connect(config);
