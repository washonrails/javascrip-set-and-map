import assert from "assert"
import { faker } from '@faker-js/faker';


export default function setAPI() {

	const MAX_ITEMS = 10
	const EVEN_NUMS = 2
	const generateCar = (mainDb, replicateDb) => {

	for (let index = 0; index < MAX_ITEMS; index++) {
		const car = {
			name: faker.vehicle.model(),
			releaseYear: faker.date.past().getFullYear(),
			available: true,
			gasAvailable: true,
		}
		mainDb.add(car)

		if (!replicateDb) continue;
		if (index % EVEN_NUMS !== 0) continue;

		replicateDb.add(car)
	}
		return mainDb
}

	const carsDb1 = generateCar(new Set())
	const carsDb2 = generateCar(new Set(), carsDb1)
	
	assert.deepStrictEqual(carsDb2.size, MAX_ITEMS)
	assert.deepStrictEqual(carsDb1.size, (MAX_ITEMS + (MAX_ITEMS / EVEN_NUMS)))
	

	const replications = new Set([...carsDb1].filter(car => carsDb2.has(car)))
	assert.deepStrictEqual(replications.size, (MAX_ITEMS / EVEN_NUMS))

	const uniqueFromDb1 = new Set([...carsDb1].filter(car => !carsDb2.has(car)))
	assert.deepStrictEqual(uniqueFromDb1.size, MAX_ITEMS)

	const uniqueFromDb2 = new Set([...carsDb2].filter(car => !carsDb1.has(car)))
	assert.deepStrictEqual(uniqueFromDb2.size, (MAX_ITEMS / EVEN_NUMS))

	const allDBWithoutReplications = new Set([...carsDb1, ...carsDb2])
	assert.deepStrictEqual(allDBWithoutReplications.size, (MAX_ITEMS * 2))

	for (const item of carsDb1) carsDb2.add(item)
	assert.deepStrictEqual(carsDb2.size, (MAX_ITEMS * EVEN_NUMS))

	console.log('unique items of db1 not included in db2', uniqueFromDb1.size)
	console.log('unique items of db2 not included in db1 ', uniqueFromDb2.size)

	console.log('replicated data', replications.size)
	console.log('unique items on all dbs', allDBWithoutReplications.size)
}


