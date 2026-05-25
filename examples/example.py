# I had Gemini make this example file so we can use it as reference
# It contains a lot, but not all, of the stuff you can do with PyBricks

# I'm not sure what it does


from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor, ColorSensor, UltrasonicSensor, ForceSensor
from pybricks.parameters import Port, Direction, Stop, Color, Side, Button
from pybricks.tools import wait, StopWatch

# =============================================================================
# 1. INITIALIZATION & HUB HARDWARE
# =============================================================================

# Initialize the SPIKE Prime Hub
hub = PrimeHub()

# Initialize a stopwatch for timing events
watch = StopWatch()

# Clear the display and set hub light to a starting color
hub.light.on(Color.VIOLET)
hub.display.clear()

# =============================================================================
# 2. DEVICE SETUP (Ports A-F)
# =============================================================================
# Note: Adjust your ports based on what you actually have plugged in!

try:
    # Motor with default settings
    left_motor = Motor(Port.A)
    
    # Motor with custom direction and geared setup (e.g., 12-tooth to 36-tooth gear)
    right_motor = Motor(Port.B, Direction.COUNTERCLOCKWISE, gears=[12, 36])
    
    # Sensors
    color_sensor = ColorSensor(Port.C)
    distance_sensor = UltrasonicSensor(Port.D)
    force_sensor = ForceSensor(Port.E)
except RuntimeError:
    print("Warning: Some devices are not plugged into the designated ports.")

# =============================================================================
# 3. DISPLAY & LIGHT MATRIX EXAMPLES
# =============================================================================

print("--- Testing Display and Lights ---")

# Display a static image (built-in icon)
hub.display.icon(ColorSensor.eye_matrix) # or choose an icon manually
wait(1000)

# Display a scrolling text message
hub.display.text("PYBRICKS", On=100, Off=0) 
wait(2000)

# Custom pixel control (5x5 matrix, values 0 to 100 for brightness)
grid = [
    [100,   0, 100,   0, 100],
    [  0, 100,   0, 100,   0],
    [100,   0, 100,   0, 100],
    [  0, 100,   0, 100,   0],
    [100,   0, 100,   0, 100],
]
hub.display.orientation(Side.TOP) # Can orient the display: TOP, LEFT, RIGHT, BOTTOM
hub.display.matrix(grid)
wait(1500)

# =============================================================================
# 4. SOUND & SPEAKER EXAMPLES
# =============================================================================

print("--- Testing Sound ---")
hub.speaker.volume(50) # Set volume (0-100)

# Play a series of beeps (Frequency in Hz, Duration in ms)
hub.speaker.beep(frequency=440, duration=200)
hub.speaker.beep(frequency=880, duration=200)

# Play a melody (Notes specified by strings)
notes = ["C4/4", "E4/4", "G4/4", "C5/2"]
hub.speaker.play_notes(notes, tempo=120)

# =============================================================================
# 5. IMU / INTERNAL MOTION SENSORS
# =============================================================================

print("--- Testing IMU (Motion) ---")

# Check the current orientation/side facing up
up_side = hub.imu.up()
print("Side facing up:", up_side)

# Read acceleration, angular velocity, and tilt
accel = hub.imu.acceleration() # Returns (x, y, z) in mm/s²
gyro = hub.imu.angular_velocity() # Returns (x, y, z) in deg/s
tilt = hub.imu.tilt() # Returns (pitch, roll) pitch and roll angles

print(f"Accel: {accel}, Gyro: {gyro}, Tilt: {tilt}")

# Check for specific gestures (e.g., tapped, shaken, fallen)
if hub.imu.ready():
    print("IMU is calibrated and ready.")

# =============================================================================
# 6. BUTTONS & STOPWATCH (Interactive Loop)
# =============================================================================

print("--- Testing Buttons & Sensor Input (Press Left/Right/Center Button to proceed) ---")
watch.reset()

while True:
    pressed = hub.buttons.pressed()
    
    # Check if a specific button is pressed
    if Button.CENTER in pressed:
        print("Center button pressed! Breaking loop.")
        break
    elif Button.LEFT in pressed:
        print("Left button pressed. Current time:", watch.time())
        hub.light.on(Color.GREEN)
    elif Button.RIGHT in pressed:
        print("Right button pressed.")
        hub.light.on(Color.RED)
        
    # Read sensor values safely if they are attached
    try:
        # Color sensor: color, reflection (0-100), ambient (0-100)
        detected_color = color_sensor.color()
        ambient_light = color_sensor.ambient()
        
        # Distance sensor: distance in mm
        dist = distance_sensor.distance()
        
        # Force sensor: force in Newtons, distance/button press depth in mm
        force = force_sensor.force()
        is_pressed = force_sensor.pressed()
        
        if is_pressed:
            print(f"Force sensor pressed with {force} Newtons!")
    except:
        pass # Ignore if sensors aren't attached during this loop

    wait(100) # Small delay to prevent spamming the CPU

# =============================================================================
# 7. ADVANCED MOTOR CONTROL
# =============================================================================

print("--- Testing Motor Control ---")

try:
    # Reset motor encoder angle to 0
    left_motor.reset_angle(0)
    
    # 1. Run at a constant speed (degrees per second) indefinitely
    left_motor.run(speed=500)
    wait(1000)
    
    # 2. Stop the motor (Options: Stop.COAST, Stop.BRAKE, Stop.HOLD)
    left_motor.stop() # Default coast/brake depending on setup
    wait(500)
    
    # 3. Run for a specific duration (ms) then hold position
    left_motor.run_time(speed=-300, time=1500, then=Stop.HOLD, wait=True)
    
    # 4. Run to a specific target angle (absolute)
    right_motor.run_target(speed=400, target_angle=180, then=Stop.BREAK, wait=True)
    
    # 5. Run by a relative angle (e.g., turn 90 degrees from where you are)
    right_motor.run_angle(speed=200, rotation_angle=90, wait=True)
    
    # Read motor telemetry
    current_angle = left_motor.angle()
    current_speed = left_motor.speed()
    print(f"Left Motor -> Angle: {current_angle}, Speed: {current_speed}")

except NameError:
    print("Motors not defined, skipping motor test.")

# =============================================================================
# 8. SYSTEM STATUS & SHUTDOWN
# =============================================================================

# Read battery status
voltage = hub.battery.voltage() # millivolts
current = hub.battery.current() # milliamps
print(f"Battery Voltage: {voltage} mV, Current: {current} mA")

# Gracefully power off the hub (uncomment if you want it to auto-shutdown)
print("Script finished successfully!")
hub.light.on(Color.BLUE)
wait(2000)
# hub.system.shutdown()