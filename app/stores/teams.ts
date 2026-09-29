import { defineStore } from 'pinia'

export type Team = {
    name: string,
    password: string,
    points: number,
}

export const useTeamsStore = defineStore('teams', () => {
    const teams = ref<Team[]>([]);

    const initializeTeams = async () => {
        const storyblokApiToken = useRuntimeConfig().public.storyblokApiToken;

        try{
            const response = await $fetch('https://api.storyblok.com/v2/cdn/datasource_entries?datasource=teams&token=' + storyblokApiToken);
            const data = response.datasource_entries;

            teams.value = data.map((team) => {
                return {
                    name: team.name,
                    password: team.value,
                    points: 0,
                }
            })
        } catch (e) {
            console.log(e)
        }
    };

    const addPoints = (teamName: string, points: number) => {
        const team = teams.value.find((team) => team.name === teamName);
        if(!team) return;
        team.points = team.points + points;
        
    }
    const substractPoints = (teamName: string, points: number) => {
        const team = teams.value.find((team) => team.name === teamName);
        if(!team) return;
        team.points = team.points - points;

    }
    const resetPoints = () => {
        teams.value = teams.value.map((team) => {
            return {
                ...team,
                points: 0,
            }
        })
    };

    return { teams, initializeTeams, addPoints, substractPoints, resetPoints };
}, {persist: true})