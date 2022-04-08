import {TestBed} from '@angular/core/testing';
import {User} from "./User";

describe('User', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: []
        })
            .compileComponents();
    });

    it('can be created', () => {
        let user = new User("alex");
        expect(user.name).toBe("alex")
    });
});
