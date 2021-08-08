import { getHealth } from '../health';
describe('GET /health', () => {
    it('Should receive uptime', async () => {
        const result = await getHealth();
        expect(result).toHaveProperty('uptime');
    })
})