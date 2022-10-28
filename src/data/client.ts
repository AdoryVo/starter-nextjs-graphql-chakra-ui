import ky from 'ky'

const client = ky.create({ prefixUrl: '/api/server' })

export default client