const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
	let adoption;
	let expectedAdopter;

	before(async ()=> {
		adoption = await Adoption.deployed();
	});

	describe("adopting a pet and retrieving account addresses", async () => {
		before("adopt a pet using accoutns[0]", async () => {
			await adoption.adopt(8, { from: accounts[0] });
			expectedAdopter = accounts[0];
		});

		it("can fetch the address of an owner by pet id", async () => {
			const adopter = await adoption.adopters(8);
			const msg = "The owner of the adopted pet should be the first account";
			assert.equal(adopter, expectedAdopter, msg);
		});

		it("can fetch the collection of all pet owners' addresses", async () => {
			const adopters = await adoption.getAdopters();
			const msg = "The owner of the adopted pet should be the first account";
			assert.equal(adopters[8], expectedAdopter, msg);
		});
	});
});