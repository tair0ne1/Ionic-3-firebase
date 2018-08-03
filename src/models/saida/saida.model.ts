import { Profile } from "./profile.model";

export interface Saida {
        key;
		name: string;
		local: string;
		valor: number;
		owner: Profile;
	}