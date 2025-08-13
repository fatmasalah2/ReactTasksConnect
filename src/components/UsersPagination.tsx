import React from "react";
import { Pagination } from "@mui/material";

interface UsersPaginationProps {
    page: number;
    totalPages: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const UsersPagination: React.FC<UsersPaginationProps> = ({ page, totalPages, onChange }) => {
    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={onChange}
            color="primary"
            sx={{
                "& .MuiPaginationItem-root": {
                    color: "#1976d2",
                    fontWeight: "bold",
                },
                "& .Mui-selected": {
                    backgroundColor: "#1976d2 !important",
                    color: "white",
                },
            }}
        />
    );
};

export default UsersPagination;
