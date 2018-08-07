import { Profile } from "../profile/profile.model";

export interface Saida {
        key: string;
		name: string;
		local: string;
		valor: number;
		owner: Profile;
	}