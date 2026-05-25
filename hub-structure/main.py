from pybricks.tools import hub_menu

hub = PrimeHub()

# We're using 0-19 instead of 1-20 to keep this as similar to SPIKE Prime as possible
selected = hub_menu("0", "1", "2",, "3", "4", "5", "6", "7",
"8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19") 

if selected == "0":
    import zero
elif selected == "1":
    import one
elif selected == "2":
    import two
elif selected == "3":
    import three
elif selected == "4":
    import four
elif selected == "5":
    import five
elif selected == "6":
    import six
elif selected == "7":
    import seven
elif selected == "8":
    import eight
elif selected == "9":
    import nine
elif selected == "10":
    import ten
elif selected == "11":
    import eleven
elif selected == "12":
    import twelve
elif selected == "13":
    import thirteen
elif selected == "14":
    import fourteen
elif selected == "15":
    import fifteen
elif selected == "16":
    import sixteen
elif selected == "17":
    import seventeen
elif selected == "18":
    import eighteen
elif selected == "19":
    import nineteen
