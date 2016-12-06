import Strategies from './Strategy';

export default class StrategyFactory {
	constructor(){}
	
    create(type) {
        let strategy;
		
		switch(type){
			case 'default': 
				strategy = new Strategies.DefaultStrategy();
				break;
			case 'general': 
				strategy = new Strategies.GeneralStrategy();
				break;
			case 'sport': 
				strategy = new Strategies.SportStrategy();
				break;
			case 'music': 
				strategy = new Strategies.MusicStrategy();
				break;
			case 'business': 
				strategy = new Strategies.BusinessStrategy();
				break;
			case 'technology': 
				strategy = new Strategies.TechnologyStrategy();
				break;
			case 'science-and-nature': 
				strategy = new Strategies.ScienceAndNatureStrategy();
				break;
			case 'entertainment': 
				strategy = new Strategies.EntertainmentStrategy();
				break;	
			case 'gaming': 
				strategy = new Strategies.GamingStrategy();
				break;
			default: 
				strategy = new Strategies.DefaultStrategy();
				break;	
		}
		
        return strategy;
    }
}