export abstract class Entity<T = any> {
	declare public readonly props: T;

	constructor(props: T) {
		this.props = props;
	}

	/**
	 * Maps entity data to persistence format
	 * for the database.
	 *
	 * @return {any} - mapped data
	 */
	abstract mapToPersistency(): any;
}
