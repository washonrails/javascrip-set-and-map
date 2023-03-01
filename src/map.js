import assert from "assert"

export default function mapAPI() {
	const itemObj = { name: 'wallace' }
	const itemMap = new Map([ ['name', 'wallace'] ])
	
	itemObj.birthDay = '08/10/2002'
	assert.ok(itemObj.birthDay === '08/10/2002')

	itemMap.set('birthDay', '08/10/2002')
	assert.deepStrictEqual(itemMap.get('birthDay'), '08/10/2002')

	assert.ok(itemObj.hasOwnProperty('birthDay'))
	assert.ok(itemMap.has('birthDay'))

	delete itemObj.birthDay
	assert.deepStrictEqual(itemObj.hasOwnProperty('birthDay'), false)
	
	itemMap.delete('birthDay')
	assert.deepStrictEqual(itemMap.has('birthDay'), false)

	assert.deepStrictEqual(Object.keys(itemObj).length, 1)
	assert.deepStrictEqual(itemMap.size, 1)

	assert.deepStrictEqual(Object.entries(itemObj), [['name', 'wallace']])
	assert.deepStrictEqual([...itemMap], [['name', 'wallace']])

	for (const [key,value] of Object.entries(itemObj)) {
		assert.deepStrictEqual([key,value], ['name', 'wallace'])
	}

	for (const [key,value] of itemMap) {
		assert.deepStrictEqual([key,value], ['name', 'wallace'])
	}

	Object.keys(itemObj).map(key => delete itemObj[key])
	assert.deepStrictEqual(Object.keys(itemObj), [])

	itemMap.clear()
	assert.deepStrictEqual([...itemMap.keys()], [])

	const t = {
		toString() {
			return 'aee'
		}
	}
	assert.deepStrictEqual(String(t), 'aee')

	const m = new Map()
	m.set('toString', 'teste')

	assert.deepStrictEqual(String(m), '[object Map]')
}
