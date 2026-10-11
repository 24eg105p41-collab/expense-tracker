package com.expensetracker.util;

import java.util.Set;

public final class ConstantsUtil {

    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final int MAX_PAGE_SIZE = 100;
    public static final int RECENT_EXPENSES_LIMIT = 5;
    public static final int TREND_MONTHS = 6;
    public static final String DEFAULT_SORT_FIELD = "expenseDate";
    public static final Set<String> ALLOWED_SORT_FIELDS =
            Set.of("expenseDate", "amount", "title", "category", "createdAt");

    private ConstantsUtil() {
    }
}
