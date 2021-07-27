import ReactPaginate from 'react-paginate';

import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import './styles.scss';

type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item: number) => void;
}

const Pagination = ({ totalPages, activePage, onChange }: Props) => {

    const renderIcon = (type: 'previous' | 'next') => (
        <ArrowIcon
            className={`pagination-${type}`}
            data-testid={`arrow-icon-${type}`}
        />
    );

    return (
        <div className="pagination-container">

            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={selectedItem => onChange(selectedItem.selected)}
                previousLabel={renderIcon('previous')}
                nextLabel={renderIcon('next')}
                containerClassName="pagination"
                pageLinkClassName="pagination-item"
                breakClassName="pagination-item"
                activeLinkClassName="active"
                previousClassName="page-active"
                nextClassName="page-active"
                disabledClassName="page-inactive"
                forcePage={activePage}
            />

        </div>
    );
}

export default Pagination;