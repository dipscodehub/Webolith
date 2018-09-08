import React from 'react';
import PropTypes from 'prop-types';

import BlankSearchDialog from '../search/dialog';
import ContainerWithSearchRows from '../dialog_container_with_search_rows';

import { SearchTypesEnum, SearchCriterion } from '../search/types';

import WordwallsAPI from '../../wordwalls_api';
import GenericRPC from '../../generic_rpc';

const allowedSearchTypes = new Set([
  SearchTypesEnum.FIXED_LENGTH,
  SearchTypesEnum.MAX_SOLUTIONS,
  SearchTypesEnum.NUM_TWO_BLANKS,
]);


class BlanksDialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.flashcardSearchSubmit = this.flashcardSearchSubmit.bind(this);
  }

  // Return the NAME of the lexicon, rather than the number. Macondo requires
  // the lexicon name.
  getLexiconName() {
    return this.props.availableLexica.find(el => el.id === this.props.lexicon).lexicon;
  }

  searchSubmit() {
    this.props.showSpinner();
    let wordLength;
    let maxSolutions;
    let num2Blanks;
    this.props.searches.forEach((search) => {
      switch (search.searchType) {
        case SearchTypesEnum.FIXED_LENGTH:
          wordLength = search.options.value;
          break;
        case SearchTypesEnum.MAX_SOLUTIONS:
          maxSolutions = search.options.value;
          break;
        case SearchTypesEnum.NUM_TWO_BLANKS:
          num2Blanks = search.options.value;
          break;
        default:
          throw new Error('Unhandled search type');
      }
    });
    this.props.macondoRPC.rpcwrap('AnagramService.BlankChallenge', {
      wordLength,
      numQuestions: this.props.questionsPerRound,
      lexicon: this.getLexiconName(),
      maxSolutions,
      num2Blanks,
    })
      .then(result => console.log(result))
      .catch(error => this.props.notifyError(error));
  }

  flashcardSearchSubmit() {
    this.props.showSpinner();
  }

  render() {
    return (
      <BlankSearchDialog
        onSearchSubmit={this.searchSubmit}
        onFlashcardSubmit={this.flashcardSearchSubmit}
        allowedSearchTypes={allowedSearchTypes}
        {...this.props}
      />);
  }
}

BlanksDialogContainer.propTypes = {
  searches: PropTypes.arrayOf(PropTypes.instanceOf(SearchCriterion)).isRequired,
  lexicon: PropTypes.number.isRequired,
  availableLexica: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    lexicon: PropTypes.string,
    description: PropTypes.string,
    counts: PropTypes.object,
  })).isRequired,
  desiredTime: PropTypes.number.isRequired,
  questionsPerRound: PropTypes.number.isRequired,
  notifyError: PropTypes.func.isRequired,
  redirectUrl: PropTypes.func.isRequired,
  // availableLexica: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   lexicon: PropTypes.string,
  //   description: PropTypes.string,
  //   counts: PropTypes.object,
  // })).isRequired,
  tablenum: PropTypes.number.isRequired,
  onLoadNewList: PropTypes.func.isRequired,
  showSpinner: PropTypes.func.isRequired,
  hideSpinner: PropTypes.func.isRequired,
  api: PropTypes.instanceOf(WordwallsAPI).isRequired,
  macondoRPC: PropTypes.instanceOf(GenericRPC).isRequired,
  disabled: PropTypes.bool.isRequired,
};

const DialogContainer = ContainerWithSearchRows(
  BlanksDialogContainer,
  allowedSearchTypes,
  [
    new SearchCriterion(SearchTypesEnum.FIXED_LENGTH, {
      value: 7,
    }),
    new SearchCriterion(SearchTypesEnum.MAX_SOLUTIONS, {
      value: 5,
    }),
    new SearchCriterion(SearchTypesEnum.NUM_TWO_BLANKS, {
      value: 4,
    }),
  ],
);

export default DialogContainer;
