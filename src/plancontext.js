import React, { Component } from 'react'
import items from './plandata'

const PlanContext = React.createContext();
// <RoomContext.Provider value={'Hallo'}
class PlanProvider extends Component {
    state = {
        plans: [],
        sortedPlans: [],
        loading: true,
        type: 'all',
        area: 'all',
        city: 'all',
        midpoint: 'all',
        days: 'all'
    };

    //getData

    componentDidMount() {
        //this.getData
        let plans = this.formatData(items);

        this.setState({
            plans,
            sortedPlans: plans,
            loading: false,
        });

    }

    formatData() {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image =>
                image.fields.file.url);

            let plan = { ...item.fields, images, id };
            return plan;
        });
        return tempItems
    }

    getPlace = (slug) => {
        let tempPlans = [...this.state.plans];
        const plan = tempPlans.find(plan => plan.slug ===
            slug);
        return plan;
    };

    planhandleChange = event => {
        const target = event.target

        const value = target.type === 'checkbox' ?
            target.checked : target.value
        const name = event.target.name
        this.setState(
            {
                [name]: value
            },
            this.filterPlans
        );
    };

    filterPlans = () => {
        let {
            plans, type, area, city, days
        } = this.state


        // all the rooms 
        let tempPlans = [...plans];

        //filter by type
        if (type !== 'all') {
            tempPlans = tempPlans.filter(plan => plan.type ===
                type);
        }

        //filter by area
        if (area !== 'all') {
            tempPlans = tempPlans.filter(plan => plan.area ===
                area);
        }

        //filter by city
        if (city !== 'all') {
            tempPlans = tempPlans.filter(plan => plan.city ===
                city);
        }

        //filter by days
        if (days !== 'all') {
            tempPlans = tempPlans.filter(plan => plan.days ===
                days);
        }

    //         //filter by no of persons
    // if (city !== 'all') {
    //     tempPlans = tempPlans.filter(plan => plan.city ===
    //       city);
    //   }
  
        //change state
        this.setState({
            sortedPlans: tempPlans
        })
    };

    render() {
        return (
            <PlanContext.Provider value={{
                ...this.state,
                getPlan: this.getPlan,
                planhandleChange: this.planhandleChange
            }}>
                {this.props.children}
            </PlanContext.Provider>
        )
    }
}

const PlanConsumer = PlanContext.Consumer;

export function withPlanConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <PlanConsumer>
            {value => <Component {...props} plancontext={value} />}
        </PlanConsumer>

    }
}

export { PlanProvider, PlanConsumer, PlanContext };
