import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

	componentDidMount() {
		this.props.getItems();
	}

	onDeleteClick = (id) => {
		this.props.deleteItem(id);
	}



	render() {
		const { items } = this.props.item;

		return (
			<Container>

				<ListGroup>
					<TransitionGroup className="shopping-list"> 
						{items.map(({ _id, name }) => (
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<ListGroupItem>
								<button 
									className="remove-btn"
									style={{marginRight: '.5rem', color: 'white', backgroundColor: '#a31919', display: 'inline-block', border: 'none', height: '36px', width: '32px', cursor: 'pointer', borderRadius: '4px'}}
									
									onClick={this.onDeleteClick.bind(this, _id)}

								> X </button>
								{name}
								</ListGroupItem>

							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem })(ShoppingList);