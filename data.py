import random

class Person:
    def __init__(self, name):
        self.name = name
        self.sleep_hours = 8  # Ideal sleep hours per night
        self.performance = 100  # Initial performance score (0-100)
        self.mood = 100  # Initial mood score (0-100)
        self.cognitive_ability = 100  # Initial cognitive ability (0-100)

    def sleep(self, hours):
        # Simulate the effect of sleep on the person
        if hours < 5:
            self.performance -= random.randint(10, 20)
            self.mood -= random.randint(5, 15)
            self.cognitive_ability -= random.randint(10, 20)
        elif hours < 7:
            self.performance -= random.randint(5, 10)
            self.mood -= random.randint(3, 7)
            self.cognitive_ability -= random.randint(5, 10)
        else:
            self.performance = min(100, self.performance + random.randint(5, 10))
            self.mood = min(100, self.mood + random.randint(2, 5))
            self.cognitive_ability = min(100, self.cognitive_ability + random.randint(5, 10))

    def report(self):
        # Report the current state of the person
        return {
            "Performance": self.performance,
            "Mood": self.mood,
            "Cognitive Ability": self.cognitive_ability
        }

def simulate_sleep_deprivation(person, days):
    performance_data = []
    mood_data = []
    cognitive_data = []
    sleep_data = []

    for day in range(1, days + 1):
        # Simulate sleep hours (random between 4 to 9 hours for sleep deprivation)
        hours_slept = random.randint(4, 9)
        person.sleep(hours_slept)

        # Store the data for each day
        report = person.report()
        performance_data.append(report["Performance"])
        mood_data.append(report["Mood"])
        cognitive_data.append(report["Cognitive Ability"])
        sleep_data.append(hours_slept)

    return performance_data, mood_data, cognitive_data, sleep_data

def print_results(performance, mood, cognitive, sleep):
    # Print the results
    for i in range(len(performance)):
        print(f"Day {i + 1}:")
        print(f"  Performance: {performance[i]}")
        print(f"  Mood: {mood[i]}")
        print(f"  Cognitive Ability: {cognitive[i]}")
        print(f"  Hours Slept: {sleep[i]}")
        print()

# Create a person and simulate sleep deprivation over 30 days
person = Person("John Doe")
performance, mood, cognitive, sleep = simulate_sleep_deprivation(person, 10)

# Print the results
print_results(performance, mood, cognitive, sleep)