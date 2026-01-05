import {test, expect} from '../fixtures/api.fixtures';

test('verify api response', async({vehicleController})=>{
    
        const payload = {
            ClientCode: 'VCI',
        EntityId: 'Vehicle-VCI-23asrwrgo6222tze',
        EntityType: 'Vehicle',
        VehicleId: 'Vehicle-VCI-23asrwrgo6222tze'
        }
        const response = await vehicleController.GetAuditForVehicle(payload);
    expect(response.status).toBe(200);
    expect(response.ok).toBeTruthy();
    expect(response.data.isValid).toBe(true);
})

test('Verify not login but can access the link',async({authenPage})=>{
    await authenPage.goto('https://vciadmin.qa.flex.cafe/inventory/listing');
    await expect(authenPage).toHaveURL(/.*inventory/);
    await expect(authenPage.locator('h1')).toContainText('I Want To');
})