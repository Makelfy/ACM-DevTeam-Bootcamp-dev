export function getUserWithoutPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
