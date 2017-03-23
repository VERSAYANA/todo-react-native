import { connect } from "react-redux";
import { gql, graphql, compose } from 'react-apollo';
import TodosComponent from "../components/TodosComponent";

const MyQuery = gql`query MyList($id: ID!) {
  List(id: $id) {
    todoes {
      text
    }
  }
}`;
const gifID = (props) => {
	console.log(props.navigation.state.params.id);
	return props.navigation.state.params.id
}

const mapStateToProps = (state, props) => ({
  filter: state.filter,
	id: gifID(props)
});


const mapDispatchToProps = {
  toggleFilter: () => ({
    type: "TOGGLE_FILTER"
  })
};

export default compose(
  graphql(MyQuery, {
		options: (props) => ({
			variables: {
				id: props.navigation.state.params.id
			},
		}),
	}),
  connect(mapStateToProps, mapDispatchToProps)
)(TodosComponent);
