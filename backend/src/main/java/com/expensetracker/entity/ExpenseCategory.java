package com.expensetracker.entity;

public enum ExpenseCategory {
    FOOD("Food & Dining"),
    TRANSPORT("Transport"),
    HOUSING("Housing & Rent"),
    UTILITIES("Utilities & Bills"),
    HEALTH("Health & Fitness"),
    ENTERTAINMENT("Entertainment"),
    SHOPPING("Shopping"),
    EDUCATION("Education"),
    TRAVEL("Travel"),
    OTHER("Other");

    private final String label;

    ExpenseCategory(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
